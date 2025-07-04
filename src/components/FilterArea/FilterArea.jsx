import { FaFilter } from "react-icons/fa6";

const FilterArea = ({ setFilters, filters }) => {
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;

    setFilters((prev) => {
      // Determine which group the filter belongs to: class or subject
      const group =
        name in prev.class ? "class" : name in prev.subject ? "subject" : null;

      if (!group) return prev; // safety check

      return {
        ...prev,
        [group]: {
          ...prev[group],
          [name]: checked,
        },
      };
    });
  };

  return (
    <div className="bg-[#0080801A] border border-gray-300 rounded-2xl p-6 min-w-48 max-w-64">
      <div>
        <FaFilter className="inline-flex me-2 text-primaryColor"></FaFilter>{" "}
        <span className="font-bold">Filter by:</span>
      </div>
      <div className="divider font-semibold">Class:</div>
      {/* filter by class  */}
      <div>
        <div>
          <input
            checked={filters.class.class6}
            onChange={handleFilterChange}
            type="checkbox"
            name="class6"
            id="class6"
          />
          <label htmlFor="class6"> Class 6</label>
        </div>
        <div>
          <input
            checked={filters.class.class7}
            onChange={handleFilterChange}
            type="checkbox"
            name="class7"
            id="class7"
          />
          <label htmlFor="class7"> Class 7</label>
        </div>
        <div>
          <input
            checked={filters.class.class8}
            onChange={handleFilterChange}
            type="checkbox"
            name="class8"
            id="class8"
          />
          <label htmlFor="class8"> Class 8</label>
        </div>
        <div>
          <input
            checked={filters.class.class9}
            onChange={handleFilterChange}
            type="checkbox"
            name="class9"
            id="class9"
          />
          <label htmlFor="class9"> Class 9</label>
        </div>
        <div>
          <input
            checked={filters.class.class10}
            onChange={handleFilterChange}
            type="checkbox"
            name="class10"
            id="class10"
          />
          <label htmlFor="class10"> Class 10</label>
        </div>
        <div>
          <input
            checked={filters.class.class11}
            onChange={handleFilterChange}
            type="checkbox"
            name="class11"
            id="class11"
          />
          <label htmlFor="class11"> Class 11</label>
        </div>
        <div>
          <input
            checked={filters.class.class12}
            onChange={handleFilterChange}
            type="checkbox"
            name="class12"
            id="class12"
          />
          <label htmlFor="class12"> Class 12</label>
        </div>
      </div>
      <div className="divider font-semibold">Subject:</div>
      {/* filter by subject  */}
      <div>
        <div>
          <input
            checked={filters.subject.Ict}
            onChange={handleFilterChange}
            type="checkbox"
            name="Ict"
            id="Ict"
          />
          <label htmlFor="Ict"> Ict</label>
        </div>
        <div>
          <input
            checked={filters.subject.Bangla}
            onChange={handleFilterChange}
            type="checkbox"
            name="Bangla"
            id="Bangla"
          />
          <label htmlFor="Bangla"> Bangla</label>
        </div>
        <div>
          <input
            checked={filters.subject.English}
            onChange={handleFilterChange}
            type="checkbox"
            name="English"
            id="English"
          />
          <label htmlFor="English"> English</label>
        </div>
        <div>
          <input
            checked={filters.subject.Math}
            onChange={handleFilterChange}
            type="checkbox"
            name="Math"
            id="Math"
          />
          <label htmlFor="Math"> Math</label>
        </div>
        <div>
          <input
            checked={filters.subject.Biology}
            onChange={handleFilterChange}
            type="checkbox"
            name="Biology"
            id="Biology"
          />
          <label htmlFor="Biology"> Biology</label>
        </div>
        <div>
          <input
            checked={filters.subject.Physics}
            onChange={handleFilterChange}
            type="checkbox"
            name="Physics"
            id="Physics"
          />
          <label htmlFor="Physics"> Physics</label>
        </div>
        <div>
          <input
            checked={filters.subject.Chemistry}
            onChange={handleFilterChange}
            type="checkbox"
            name="Chemistry"
            id="Chemistry"
          />
          <label htmlFor="Chemistry"> Chemistry</label>
        </div>
        <div>
          <input
            checked={filters.subject.Accounting}
            onChange={handleFilterChange}
            type="checkbox"
            name="Accounting"
            id="Accounting"
          />
          <label htmlFor="Accounting"> Accounting</label>
        </div>
        <div>
          <input
            checked={filters.subject.Economics}
            onChange={handleFilterChange}
            type="checkbox"
            name="Economics"
            id="Economics"
          />
          <label htmlFor="Economics"> Economics</label>
        </div>
      </div>
    </div>
  );
};

export default FilterArea;
