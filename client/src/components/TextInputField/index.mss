.text_input {
  width: 100%;
  height: auto;
  margin-top: 12.5px;
  position: relative;
  font-family: 'Libre Franklin', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
    sans-serif;

  &__label {
    display: block;
    font-size: 0.8rem;
    color: #636363;
    transform: translateY(100%);
    transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: -1;
    margin-left: 5px;
    margin-bottom: 2.5px;
  }

  &__input {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 15px;
    font-size: 1.2rem;
    color: #636363;
    border: none;
    border-radius: 5px;
    transition: box-shadow 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: #fff;

    &::placeholder {
      color: #bcbec0;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 2px 0px rgb(0 0 0 / 25%);
    }
  }

  &--valid &__label,
  &--invalid &__label {
    transform: translateY(0);
  }

  &--invalid > * {
    border-color: red;
  }
}
