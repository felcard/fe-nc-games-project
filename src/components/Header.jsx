export default function Header({ user }) {
  return (
    <header>
      <h1 className="header--title">NC Games Rating</h1>
      <h3 className="header--wellcome">
        Wellcome Back: <span id="header--user">{user}</span>
      </h3>
    </header>
  );
}
