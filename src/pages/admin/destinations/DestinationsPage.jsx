import { useState } from "react";
import CreatePageDestination from "./Createdestination";
import DestinationDashboard from "./indexPageDestination";
import ViewPageDestination from "./ViewPageDestination";

export default function DestinationsPage() {
  const [screen, setScreen] = useState("list");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const returnToList = () => {
    setScreen("list");
    setSelectedDestination(null);
  };

  if (screen === "create") {
    return <CreatePageDestination onCancel={returnToList} />;
  }

  if (screen === "edit") {
    return (
      <CreatePageDestination
        initialData={selectedDestination}
        onCancel={returnToList}
      />
    );
  }

  if (screen === "details") {
    return (
      <ViewPageDestination
        destination={selectedDestination}
        onBack={returnToList}
      />
    );
  }

  return (
    <DestinationDashboard
      onAddClick={() => setScreen("create")}
      onEditClick={(destination) => {
        setSelectedDestination(destination);
        setScreen("edit");
      }}
      onViewClick={(destination) => {
        setSelectedDestination(destination);
        setScreen("details");
      }}
    />
  );
}
