export interface Props {
  tabs: Tab[];
}

interface Tab {
  label: string;
  content: string;
}

export default function Tabs(props: Props) {
  const { tabs } = props;

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {tabs.map((tab) => {
        return (
          <>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label={tab.label}
              checked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {tab.content}
            </div>
          </>
        );
      })}
    </div>
  );
}
