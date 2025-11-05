import { FILTERS, PROJECT_HEADERS, SORT_OPTIONS, STAGES } from "@/constants";
import { fetchAllProjects, ProjectApiResponse, toggleArchiveProject } from "@api/index";
import Table from "@components/Table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import EmptyState from "./EmptyState";
import FiltersBar from "./FiltersBar";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

interface Props {
    onCreate: () => void
}

const Projects = ({onCreate}: Props) => {
    const queryClient = useQueryClient();
    const [currentFilter, setCurrentFilter] = useState(FILTERS[0]);
    const [search, setSearch] = useState<string>();
    const [debouncedSearch] = useDebounce(search, 400);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStage, setSelectedStage] = useState(STAGES[0]);
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['projects', 'list', {
            status: selectedStage.id,
            sortBy: selectedSort.id,
            page: currentPage,
            viewType: currentFilter.toLowerCase(),
            search: debouncedSearch,
        }],

        queryFn: () =>
            fetchAllProjects({
                status: selectedStage.id !== 'none' ? selectedStage.id : undefined,
                sortBy: selectedSort.id !== 'none' ? selectedSort.id : undefined,
                viewType: currentFilter.toLowerCase(),
                page: currentPage,
                search: debouncedSearch
            }),
    })

    const projects = data?.data ?? [];
    const meta = data?.meta ?? {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    };

    if (isLoading) return <Spinner message="Loading projects..." />;

    if (error) return 'An error has occurred: ' + error.message

    const handleProjectOnClick = (projectId: string) => {
        navigate(`/projects/${projectId}`);
    }

    const handleArchiveProject = async (project: ProjectApiResponse) => {
        const res = await toggleArchiveProject(project.id, !project.isArchived);
        queryClient.invalidateQueries({queryKey: ["projects"]})
    }

    return (
        <>
            {/* Table Filtering */}
            <FiltersBar
                currentFilter={currentFilter}
                filters={FILTERS}
                onFilter={setCurrentFilter}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSelectedSort}
                stageOptions={STAGES}
                onStageChange={setSelectedStage}
                onSearchChange={setSearch}
                selectedStage={selectedStage}
                selectedSort={selectedSort}
                searchValue={search}
            />

            {/* Table */}
            {!projects.length ? (
                <EmptyState
                    title="It's a little quiet here"
                    description="Add your first project and let's get things moving!"
                    buttonText="Add Project"
                    onAction={onCreate}
                />
            ) : (
                <Table
                    headers={PROJECT_HEADERS}
                    data={projects}
                    actions={[{ id: 'archive', label: 'Archive', action: (project) => handleArchiveProject(project) }]}
                    total={meta.total}
                    page={meta.page}
                    pageSize={meta.limit}
                    onPageChange={setCurrentPage}
                    onClickChildren={handleProjectOnClick} />
            )}
        </>
    )
}

export default Projects