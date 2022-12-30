function CapsuleContent({ children }) {
  const fieldsToRemove = ["id", "original_launch_unix", "missions"];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const removeUnderscore = (str) => str.split("_").join(" ");

  const formatMissions = (missions) =>
    missions.map((mission) => (
      <div key={mission.name} className="flex items-center border border-r">
        <div className="text-lg font-bold text-cyan-800 w-1/2 border-r mr-2 p-2 capitalize">
          {mission.name}
        </div>{" "}
        <div className="text-base text-black w-1/2 font-semibold">
          {mission.flight}
        </div>
      </div>
    ));

  return (
    <div className="rounded p-1 md:p-4">
      {Object.keys(children).map(
        (c) =>
          !fieldsToRemove.includes(c) && (
            <div key={c} className="flex items-center border border-r">
              <div className="text-lg font-bold text-cyan-800 w-1/2 border-r mr-2 p-2 capitalize">
                {removeUnderscore(c)}
              </div>{" "}
              <div className="text-base text-black w-1/2 font-semibold">
                {c === "original_launch"
                  ? formatDate(children[c])
                  : children[c]}
              </div>
            </div>
          )
      )}

      <div className="flex items-center border border-r">
        <div className="text-lg font-bold text-cyan-800 w-1/2 border-r p-2 capitalize">
          Missions
        </div>{" "}
        <div className="text-base text-black w-1/2 font-semibold">
          {formatMissions(children.missions)}
        </div>
      </div>
    </div>
  );
}

export default CapsuleContent;
