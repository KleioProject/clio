<template>
    <div class="contacts-page">
        <div class="container">
            <div class="row">
                <h1 class="col-xs-12">Contacts</h1>
                <p class="col-xs-12">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mi elit, tempus et sem eget, sagittis consectetur lorem. Quisque et sollicitudin ligula. Aenean eu justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla et tellus leo. Curabitur pulvinar metus eu ligula blandit, in fermentum purus imperdiet. Donec vel elit posuere nibh pretium luctus. Integer vitae tempor dui, eget cursus nisl. Proin porttitor volutpat pretium. Fusce pulvinar quam vitae semper semper. Etiam auctor, elit in facilisis efficitur, nulla erat ullamcorper velit, vestibulum porttitor lacus odio in purus. Donec in ultrices metus. Fusce aliquet egestas dolor nec blandit. Sed ex mauris, scelerisque non hendrerit eu, consectetur bibendum ligula. Sed ac tellus vulputate, rhoncus justo et, aliquam risus. Morbi vehicula nibh eu metus semper, in placerat arcu tempor. Maecenas euismod tellus vitae sem accumsan dictum. Proin rutrum ipsum eros, id commodo tellus vulputate id. Etiam interdum mattis ligula, ut pulvinar ipsum tincidunt sit amet. Cras ultrices lorem mi, id elementum turpis suscipit eu. Proin viverra ipsum a enim ornare, eu viverra diam cursus. Sed faucibus, diam in luctus vestibulum, quam lorem pellentesque justo, lacinia laoreet ligula arcu ac libero. Nam risus risus, auctor ut orci in, maximus volutpat felis. Vivamus lobortis sapien odio, vel bibendum mauris fringilla pulvinar. Nulla facilisi. Phasellus eget dapibus tellus. Donec in velit accumsan justo mattis faucibus non ac lectus. Vestibulum ut tincidunt neque, sed tempor est. Nulla nisi urna, pulvinar eget justo a, bibendum interdum lorem. Sed nec nunc quis libero iaculis suscipit. Morbi sit amet ultricies lacus, ut interdum justo. Fusce porttitor dolor nec diam auctor rhoncus. Suspendisse suscipit nibh sed fermentum aliquet. Cras nulla dui, ullamcorper sed nisi nec, pretium interdum sapien. Aenean at convallis lectus. Proin tincidunt eleifend commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus at commodo dolor, vel euismod quam. Nunc fermentum erat eget ex ultricies imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed enim mi, auctor non eleifend sollicitudin, eleifend ut tortor. Nam volutpat nisl euismod, mattis quam ut, mollis diam. Curabitur varius fringilla nibh, sit amet placerat nisi egestas eu. Sed feugiat sed arcu vel consectetur. Phasellus vitae lectus in enim ornare pharetra. Ut commodo lorem non enim interdum finibus. Aenean lacinia leo justo, quis hendrerit tortor varius quis. Vivamus bibendum ante vel neque porttitor facilisis. Sed molestie vel leo eu convallis. Suspendisse blandit tincidunt suscipit. Nunc congue tempus sapien eu ultrices. Maecenas vel ultrices tortor. Vestibulum euismod, metus sit amet semper molestie, leo erat viverra augue, eget feugiat sapien elit nec odio. In accumsan eleifend lacus, sed vestibulum justo fringilla eu. Quisque ut dolor at diam fermentum maximus nec id lorem. Cras consectetur sem at pharetra congue. Praesent id mauris tortor. In laoreet sit amet massa ac rhoncus. Morbi ornare turpis erat. Donec ultrices fringilla est sit amet scelerisque. In hendrerit ligula libero, eget fringilla ligula ullamcorper sed. Mauris fermentum luctus orci et viverra.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeMount: function() {
        console.log(`beforeMount method of Contacts called from ${isBrowser ? 'client' : 'server'}`);
    }
}
</script>
