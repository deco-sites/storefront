export interface Props {
  topLeftlabel?: string;
  topRightlabel?: string;
  bottomLeftlabel?: string;
  bottomRightlabel?: string;
  placeholder?: string;
}

export default function TextArea(props: Props) {
  const {
    topLeftlabel,
    topRightlabel,
    bottomLeftlabel,
    bottomRightlabel,
    placeholder,
  } = props;

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{topLeftlabel}</span>
        <span className="label-text-alt">{topRightlabel}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
      >
      </textarea>
      <div className="label">
        <span className="label-text-alt">{bottomLeftlabel}</span>
        <span className="label-text-alt">{bottomRightlabel}</span>
      </div>
    </label>
  );
}
