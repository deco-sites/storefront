export interface Props {
  rating?: 1 | 2 | 3 | 4 | 5;
}

export default function Rating(props: Props) {
  const { rating } = props;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      {stars.map((star, idx) => {
        return (
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2"
            checked={idx + 1 === rating}
          />
        );
      })}
    </div>
  );
}
