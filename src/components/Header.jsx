export default function Header({ user }) {
  return (
    <header>
      <h1 className="header--title">NC Games Ratings</h1>
      <h3>Wellcome Back: {user}</h3>
    </header>
  );
}
