import {
    Search,
    Filter,
    ArrowDownUp,
} from "lucide-react";

function CategoryFilters({
    search,
    setSearch,
    status,
    setStatus,
    sortBy,
    setSortBy,
}) {
    return (
        <div className="categories-toolbar">

            {/* Search */}

            <div className="categories-search">
                <Search size={17} />

                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />
            </div>


            {/* Filters */}

            <div className="categories-toolbar-right">

                <div className="category-filter-select">

                    <Filter size={15} />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="All">
                            All Categories
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* Sort */}

                <div className="category-filter-select">

                    <ArrowDownUp size={15} />

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                    >
                        <option value="most-active">
                            Most Active
                        </option>

                        <option value="least-active">
                            Least Active
                        </option>

                        <option value="name">
                            Name A-Z
                        </option>

                    </select>

                </div>

            </div>

        </div>
    );
}

export default CategoryFilters;