import React from "react";
import Classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
          <header className={Classes.header}>
              <h1>ReactMeals</h1>
              <HeaderCartButton onClick={props.onShowCart} name="Your Cart" />
      </header>
      <div className={Classes['main-image']}>
        <img src={mealsImage} alt="A table full of dilicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
