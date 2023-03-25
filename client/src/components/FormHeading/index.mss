@import url('https://fonts.googleapis.com/css?family=Libre Bodoni');
@import url('https://fonts.googleapis.com/css?family=Libre Franklin');

.form_heading {
  text-align: center;
  margin: 50px 0;

  &__title {
    font-family: 'Libre Bodoni', Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 3rem;
    color: #3f3f3f;
    margin-bottom: 0;
  }

  &__subtitle {
    font-family: 'Libre Franklin', 'Franklin Gothic Medium', 'Arial Narrow',
      Arial, sans-serif;
    color: #939393;
    font-size: 1.5rem;
    margin-top: 0;
  }

  @media screen and (max-width: 800px) {
    & {
      margin: 50px 0 100px 0;
    }
  }
}
