import "./Profile.scss";

function Profile() {
  return (
    <div id="profile">
      <div className="profile_container">
        <div className="container_image">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
            width={300}
            height={300}
            alt="man in the fields"
          />
        </div>
        <div className="container_text">
            <h1 className="h1">About Me</h1>
          <p className="p">
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
