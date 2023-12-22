export interface Props {
  topLeftlabel?: string;
  topRightlabel?: string;
  bottomLeftlabel?: string;
  bottomRightlabel?: string;
}

export default function FileInput(props: Props) {
  const { topLeftlabel, topRightlabel, bottomLeftlabel, bottomRightlabel } =
    props;

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{topLeftlabel}</span>
        <span className="label-text-alt">{topRightlabel}</span>
      </div>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <div className="label">
        <span className="label-text-alt">{bottomLeftlabel}</span>
        <span className="label-text-alt">{bottomRightlabel}</span>
      </div>
    </label>
  );
}
