export const Price: React.FC<{
  currency: string;
  num: number;
  numSize: string;
}> = ({ currency, num, numSize }) => {
  return (
    <>
      {currency}
      <span className={numSize}>{num}</span>
    </>
  );
};
