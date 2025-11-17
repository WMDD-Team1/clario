export const STAGES = [
    {
        id: 'none',
        label: 'All Stages'
    },
    {
        id: 'Planning',
        label: 'Planning'
    },
    {
        id: 'In-Progress',
        label: 'In Progress'
    },
    {
        id: 'Review',
        label: 'Review'
    },
    {
        id: 'Done',
        label: 'Done'
    },
];
export const SORT_OPTIONS = [
    {
        id: 'none',
        label: 'Sort By'
    },
    {
        id: 'startDate',
        label: 'Date Started'
    },
    {
        id: 'dueDate',
        label: 'Due Date'
    },
    {
        id: 'totalBudget',
        label: 'Amount'
    },
]
export const PROJECT_HEADERS = [
    {
        key: "name",
        value: "Name"
    },
    {
        key: "startDate",
        value: "Started",
    },
    {
        key: "dueDate",
        value: "End Date",
    },
    {
        key: "clientId.name",
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
        key: "totalBudget",
        value: "Total Amount",
    }
];

export const FILTERS = ["All", "Active", "Archived"];
