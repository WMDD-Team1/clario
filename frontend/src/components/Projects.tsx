import { Project } from "@/models";
import InsightCard from "@components/InsightCard";
import Table from "@components/Table";
import { useState } from "react";
import FiltersBar from "./FiltersBar";
import EmptyState from "./EmptyState";

// CONSTS
const STAGES = [
    {
        id: 'none',
        label: 'All Stages'
    },
    {
        id: 'planning',
        label: 'Planning'
    },
    {
        id: 'in-progress',
        label: 'In Progress'
    },
    {
        id: 'done',
        label: 'Done'
    },
];
const SORT_OPTIONS = [
    {
        id: 'none',
        label: 'Sort By'
    },
    {
        id: 'name',
        label: 'Name'
    },
    {
        id: 'date',
        label: 'Date'
    },
    {
        id: 'budget',
        label: 'Budget'
    },
]
const PROJECT_HEADERS = [
    {
        key: "name",
        value: "Name"
    },
    {
        key: "startDate",
        value: "Started",
    },
    {
        key: "endDate",
        value: "End Date",
    },
    {
        key: "clientName",
        value: "Client",
    },
    {
        key: "status",
        value: "Stage",
    },
    {
        key: "milestonesCount",
        value: "Milestones",
    },
    {
        key: "amount",
        value: "Total Amount",
    }
]

// Static sample data TO BE REPLACED WITH DYNAMIC WHEN BACKEND IS READY
const projectInsights = [
    {
        title: "Total",
        value: "$12.000"
    },
    {
        title: "Active",
        value: "$8.000"
    },
    {
        title: "Inactive",
        value: "10"
    },
    {
        title: "Archive",
        value: "5"
    },
    {
        title: "Clients",
        value: "30"
    }
];
const projects: Project[] = [
    {
        name: "Website Redesign - EcoBuild",
        startDate: "Aug 15, 2025",
        endDate: "Oct 30, 2025",
        clientName: "Sarah Thompson",
        status: "In Progress",
        milestonesCount: 3,
        amount: "$4,800",
    },
    {
        name: "Mobile App UI - FitTrack",
        startDate: "Sep 05, 2025",
        endDate: "Nov 20, 2025",
        clientName: "Daniel Roberts",
        status: "Planning",
        milestonesCount: 2,
        amount: "$3,200",
    },
    {
        name: "Branding Package - Luna Café",
        startDate: "Jul 10, 2025",
        endDate: "Oct 30, 2025",
        clientName: "Olivia Martinez",
        status: "Review",
        milestonesCount: 3,
        amount: "$2,750",
    },
    {
        name: "E-Commerce Setup - StyleNest",
        startDate: "Jun 01, 2025",
        endDate: "Aug 10, 2025",
        clientName: "Michael Chen",
        status: "Done",
        milestonesCount: 3,
        amount: "$6,500",
    },
    {
        name: "Website Redesign - EcoBuild",
        startDate: "Aug 15, 2025",
        endDate: "Oct 30, 2025",
        clientName: "Sarah Thompson",
        status: "In Progress",
        milestonesCount: 3,
        amount: "$4,800",
    },
    {
        name: "Website Redesign - EcoBuild",
        startDate: "Aug 15, 2025",
        endDate: "Oct 30, 2025",
        clientName: "Sarah Thompson",
        status: "In Progress",
        milestonesCount: 3,
        amount: "$4,800",
    },
];

const Projects = () => {
    const [filters, setFilters] = useState(["All", "Active", "Archived"]);
    const [currentFilter, setCurrentFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStage, setSelectedStage] = useState({
        id: 'none',
        label: 'Stages'
    });
    const [selectedSort, setSelectedSort] = useState(
        {
            id: 'none',
            label: 'Sort By'
        }
    )



    return (
        <>
            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-5">
                {projectInsights.map((pi, i) => (
                    <InsightCard
                        key={pi.title}
                        title={pi.title}
                        value={pi.value}
                        className={i === 0 ? "col-span-2 md:col-span-1" : ""}
                    />
                ))}
            </div>
            {/* Table Filtering */}
            <FiltersBar
                currentFilter={currentFilter}
                filters={filters}
                onFilter={setCurrentFilter}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSelectedSort}
                stageOptions={STAGES}
                onStageChange={setSelectedStage}
            />

            {/* Table */}
            {!projects || projects.length === 0 ? (
                <EmptyState
                    title="It’s a little quiet here 👀"
                    description="Add your first client and let’s get things moving!"
                    buttonText="Add Project"
                    onAction={() => console.log("Open project modal")}
                />
            ) : (
                <Table
                    headers={PROJECT_HEADERS}
                    data={projects}
                    total={50}
                    page={currentPage}
                    pageSize={10}
                    onPageChange={setCurrentPage} />
            )}



        </>
    )
}

export default Projects