export function MovingDotCard() {
  return (
    <div className="outer">
      <div className="dot" />

      <div className="card">
        <div className="ray" />

        <div className="text">
          Neumor
        </div>

        {/* Líneas decorativas */}
        <div className="line topl" />
        <div className="line bottoml" />
        <div className="line leftl" />
        <div className="line rightl" />
      </div>
    </div>
  );
}
