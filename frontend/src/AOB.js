{
  /* <div className="sidebar">
  {items.map((item) => (
    <SidebarItem key={index} {...item} item={item} />
  ))}
</div>;

//Inside Sidebar Item
if (item.childrens) {
  //Return sidebar with dropdowns
} else {
  //Return sidebar item without dropdowns
} */
}

import React, { useState } from "react";

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState("home");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="App">
      <Sidebar
        activeMenuItem={activeMenuItem}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="main-content">
        {activeMenuItem === "home" && <Home />}
        {activeMenuItem === "myfiles" && <MyFiles />}
      </div>
    </div>
  );
}

function Sidebar({ activeMenuItem, onMenuItemClick }) {
  return (
    <div className="sidebar">
      <ul>
        <li
          onClick={() => onMenuItemClick("home")}
          className={activeMenuItem === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => onMenuItemClick("myfiles")}
          className={activeMenuItem === "myfiles" ? "active" : ""}
        >
          My Files
        </li>
      </ul>
    </div>
  );
}

function Home() {
  return <div>Home Component</div>;
}

function MyFiles() {
  return <div>My Files Component</div>;
}

export default App;
