import { IconType } from "react-icons";

interface FeatureShowcaseProps {
    title: string;
    description: string;
    Icon: IconType;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
    title,
    description,
    Icon
}) => {
    return (
        <div className="flex flex-col items-center gap-2 w-64 text-center">
            <Icon className="text-6xl"/>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default FeatureShowcase;
