type Props = {
  label: string;
  value: string;
  darkColor: boolean;
};

function format(label: string, value: string): string {
  if (label !== "geschlecht") return value;
  switch (value) {
    case "m":
      value = "Männlich";
      break;
    case "w":
      value = "Weiblich";
      break;
    case "d":
      value = "Divers";
      break;
  }
  return value;
}

function DetailRow({ label, value, darkColor }: Props) {
  const background: string = darkColor ? "#ced2eb" : "#e7eaf6";
  label = typeof label === "string" ? label : "Schlüssel";
  value = typeof value === "string" ? format(label, value) : "Wert";

  return (
    <div className="w-full mt-2 rounded" style={{ background }}>
      <h4 className="font-bold">{label}:</h4>
      <h4>{value}</h4>
    </div>
  );
}

export default DetailRow;
