export default function ComingSoonPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0D1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "#F4F6FF",
          margin: 0,
        }}
      >
        Find<span style={{ color: "#F07832" }}>Food</span>
      </h1>
      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "1.125rem",
          color: "#8892A4",
          textAlign: "center",
          maxWidth: "24rem",
          lineHeight: 1.6,
        }}
      >
        Something great is coming.
      </p>
    </div>
  );
}
