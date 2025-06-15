import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  techTags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export default function ProjectCard({ title, description, imageUrl, techTags, liveUrl, repoUrl }: Props) {
  return (
    <div className="rounded shadow overflow-hidden bg-white dark:bg-gray-800">
      <div className="relative w-full h-40">
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm mb-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {techTags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener" className="underline">
              Live
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener" className="underline">
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
