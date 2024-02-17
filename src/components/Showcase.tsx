export default function ShowcaseProject({
  description,
}: {
  description: string;
}) {
  return (
    <div className="flex flex-col items-start justify-start p-6 m-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
