import { Price } from "app/components/price";

export const ProductInfo: React.FC<{
  name: string;
  description: string;
  price: number;
}> = ({ name, description, price }) => {
  return (
    <div className=" font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
        {name}
      </h1>
      <p className="font-medium text-lg">{description}</p>
      <div className="text-xl text-palette-primary font-medium py-4 px-1">
        <Price currency="$" num={price} numSize="text-2xl" />
      </div>
    </div>
  );
};
