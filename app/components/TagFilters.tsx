import { X } from 'lucide-react'

interface TagFiltersProps {
  selectedTags: string[]
  isOrFilter: boolean
  onTagToggle: (tag: string) => void
  onFilterToggle: () => void
  availableTags: string[]
}

export const TagFilters = ({
  selectedTags,
  isOrFilter,
  onTagToggle,
  onFilterToggle,
  availableTags
}: TagFiltersProps) => {
  return (
    <div className="mb-6">
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-lg font-medium">Active Filters:</h3>
            <button
              onClick={onFilterToggle}
              className={`px-3 py-1 rounded text-sm ${
                isOrFilter 
                  ? 'bg-[#1FD978] text-primary'
                  : 'bg-gray-600 text-white'
              }`}
            >
              {isOrFilter ? 'OR' : 'AND'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="bg-[#1FD978] text-primary text-sm px-3 py-1 rounded flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1 rounded text-sm ${
              selectedTags.includes(tag)
                ? 'bg-[#1FD978] text-primary'
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
