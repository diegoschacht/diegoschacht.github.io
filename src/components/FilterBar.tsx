interface Props {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}

export default function FilterBar({ tags, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        className={`px-3 py-1 rounded ${active === null ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`px-3 py-1 rounded ${active === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
