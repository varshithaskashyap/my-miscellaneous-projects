template = `
<div class="quarantine">
   <img src="./static/images/cats.jpg" alt="cat"><br><br>
   
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non fringilla velit. 
        Mauris ut dui lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur 
        ridiculus mus. Aenean varius urna non enim luctus luctus. In hac habitasse platea dictumst. 
        Mauris pulvinar sapien tellus, nec tempus nunc iaculis eu. Morbi non malesuada nunc. Donec viverra, 
        lacus sit amet lobortis laoreet, odio neque rhoncus nibh, et hendrerit mi orci venenatis leo.
    </p>
    <p>
        Donec aliquet molestie laoreet. Fusce aliquet mauris dui, quis sodales nisl dignissim non. 
        Etiam pharetra molestie elementum. Vestibulum in iaculis diam. Suspendisse tristique leo in 
        velit finibus malesuada. Sed id convallis diam. Phasellus posuere rutrum maximus. 
        Donec malesuada aliquet magna eget consequat. Duis scelerisque at est a suscipit. 
        Mauris consectetur ipsum nec ex aliquet tristique. Sed felis orci, tristique nec libero quis, 
        lobortis sagittis justo. Nullam imperdiet hendrerit finibus. Aliquam risus nisl, 
        viverra at est sit amet, feugiat auctor nulla.
    </p>

</div>
`
var app = () => {
    document.getElementById("root").innerHTML = template
}