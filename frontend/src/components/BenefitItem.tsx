export default function BenefitItem({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <li className="flex items-start">
        <div className="mr-4 mt-1">
          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">✓</span>
          </div>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </li>
    );
  }