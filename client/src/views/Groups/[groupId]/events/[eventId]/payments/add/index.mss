.payment-add-form {
  height: min(100vh, 800px);
  padding: 20px;
  width: min(1200px, 100vw);
}

.event-add-form__container {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
}

.event-add-form__sub-container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

.users {
  list-style: none;
  width: 100%;
  padding-top: 30px;

  &__item {
    $height: 50px;
    width: 100%;
    height: $height;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr $height 70px;
    background-color: #fff;
    font-size: 1.2rem;

    &__name {
      display: flex;
      color: #636363;
      align-items: center;
      padding: 0 10px;
    }

    &__checkbox {
      margin: auto;
      height: 70%;
      cursor: pointer;
    }

    &__amount {
      font-size: inherit;
      border: none;
      outline: none;
    }
  }
}

@media screen and (max-width: 800px) {
  .event-add-form__container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
