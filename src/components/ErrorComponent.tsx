type ErrorProps = {
  value: string;
};
export default function ErrorComponent({ value }: ErrorProps) {
  let notNumber = Number.isNaN(value);
  return (
    <span>
      {value === "" ||
      value === "<p><br></p>" ||
      !value ||
      (value && value.length < 1) ? (
        <span style={{ color: "red", fontSize: "12px", marginLeft: "15px" }}>
          field must be filled
        </span>
      ) : null}
    </span>
  );
}
