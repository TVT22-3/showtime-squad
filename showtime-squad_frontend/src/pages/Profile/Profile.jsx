import Header from "../../components/ui/Header";
import NavBar from "../../components/ui/NavBar";
import "./Profile.scss";

function Profile() {
  return (
    <div id="profile">
      <div className="profile_container">
        <div className="container_item">
          {" "}
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw19yG0ZKIngkfosTj1YIUF5&ust=1701176398207000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOix5Yie5IIDFQAAAAAdAAAAABAI"
            width={300}
            height={300}
          />
        </div>
        <div className="container_item">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vulputate massa et felis vestibulum, nec semper elit aliquam. Nunc
            nulla nulla, cursus eu vestibulum eu, interdum in nisl. Integer eu
            nunc sem. Integer a neque pharetra, rutrum metus eget, varius elit.
            Phasellus eu dui condimentum, cursus dui a, iaculis ex. Nam
            efficitur augue et justo vulputate, in luctus lacus suscipit.
            Pellentesque vitae egestas dui. Morbi convallis justo et placerat
            eleifend. Ut in porta ex. Etiam vehicula leo eu diam congue, quis
            tempus justo pellentesque. Nullam viverra dapibus ipsum nec
            volutpat. Praesent volutpat turpis justo, nec semper neque pretium
            eget. Phasellus ultrices a est vitae sollicitudin. Phasellus
            eleifend placerat eros, a blandit nisi porttitor id.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
