export interface Props {
  recordPerPage: number;
  records: number;
}

function Summary({ recordPerPage, records }: Props) {
  return (
    <span class="text-sm font-normal">
      {recordPerPage} of {records} results
    </span>
  );
}

export default Summary;
