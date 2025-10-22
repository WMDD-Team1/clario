import { Project } from "@/models";
import InsightCard from "@components/InsightCard";
import Table from "@components/Table";
import { useState } from "react";

const Projects = () => {
    const [filters, setFilters] = useState(["All", "Active", "Archived"]);
    const [currentFilter, setCurrentFilter] = useState("All");

    // Static sample data
    const projectsInsights = [
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

    const projectHeaders = [
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

    return (
        <>
            {/* Cards */}
            <div className="flex flex-col gap-4 mb-10 md:flex-row ">
                {projectsInsights.map(
                    (pi) => <InsightCard title={pi.title} value={pi.value} key={pi.title}></InsightCard>
                )}
            </div>
            {/* Table Filtering */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                {/* Left Filter Group */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                    {filters.map((label) => (
                        <button
                            key={label}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${label === currentFilter ? "bg-gray-500 text-white" : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => setCurrentFilter(label)}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    {/* Search */}
                    <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 w-64 shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by project name or client"
                            className="outline-none text-sm flex-1 bg-transparent"
                        />
                    </div>

                    {/* Sort By */}
                    <select className="border border-gray-300 text-sm rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
                        <option>Sort By</option>
                        <option>Name</option>
                        <option>Date</option>
                        <option>Budget</option>
                    </select>

                    {/* Stages */}
                    <select className="border border-gray-300 text-sm rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
                        <option>Stages</option>
                        <option>Planning</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <Table headers={projectHeaders} data={projects} />

        </>
    )
}

export default Projects