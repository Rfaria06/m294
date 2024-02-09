type Props = {
  label: string;
  value: string;
  darkColor: boolean;
};

function DetailRow({ label, value, darkColor }: Props) {
  const background: string = darkColor ? "#ced2eb" : "#e7eaf6";
  label = typeof label === "string" ? label : "Schlüssel";
  value = typeof value === "string" ? value : "Wert";

  return (
    <div className="w-full mt-2 rounded" style={{ background }}>
      <h4 className="font-bold">{label}:</h4>
      <h4>{value}</h4>
    </div>
  );
}

export default DetailRow;
