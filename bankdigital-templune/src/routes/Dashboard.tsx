export function Dashboard() {
  return (
    <section className="py-4">
      <div className="container px-0">
        <h1 className="display-5 fw-bold mb-4">Dashboard</h1>
        <p className="text-muted mb-4">Resumen rápido de tu cuenta Banca Digital.</p>
        <div className="row g-3">
          <div className="col-sm-4">
            <div className="card p-3">
              <span className="text-muted small">Saldo</span>
              <div className="fs-5 fw-bold">$0.00</div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card p-3">
              <span className="text-muted small">Movimientos</span>
              <div className="fs-5 fw-bold">0</div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card p-3">
              <span className="text-muted small">Alertas</span>
              <div className="fs-5 fw-bold">0</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
