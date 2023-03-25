.form_button {
  $bg-color: #0b559a;
  font-size: 1.3rem;
  width: 100%;
  padding: 12.5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: linear-gradient(0deg, $bg-color, $bg-color);
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  color: #fff;
  margin-top: 90px;
  margin-bottom: 5px;

  &:hover, &:focus {
    $bg-color: #1c66ab;
  }
}
