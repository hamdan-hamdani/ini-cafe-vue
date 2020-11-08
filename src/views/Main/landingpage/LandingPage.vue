<template>
    <div class="container">
        <nav class="navbar d-flex navbar-light bg-white">
            <span class="navbar-brand flex-grow-1 mb-0 h1">
                <h1>Ini Cafe</h1>
            </span>
            <button type="button" class="btn btn-dark mr-3 rounded-pill">Masuk</button>
            <button type="button" class="btn btn-warning rounded-pill">Daftar</button>
        </nav>

        <div class="ml-5 pb-2 pl-2 overlay rounded">
            <h1 class="mt-5">Tempatnya makanan <span class="text-warning">premium</span></h1>
            <p>Makanan yang disajikan Ini cafe ialah makanan premium yang higienis</p>
            <button type="button" class="btn btn-dark rounded-pill ml-5">Beli Sekarang</button>
        </div>
        <div class="mt-150 text-center bg text-white ">
            <h2>Gunakan Kupon</h2>
            <p class="inline-block">Discount hingga <span>75%</span></p>
            <button class="ml-3 bg-warning text-white get-cupoun">Ambil Kupon</button>
        </div>
        <div class="mt-5 overlay-white">
            <h1 class="text-center">Pilih paket menu </h1>
            <div class="d-flex bd-highlight mt-5 ml-5 jc-evenly">
                <div class="card border-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center">Menu 1</div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">Primary card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the
                            card's content.</p>
                    </div>
                    <div class="text-center mb-3"><button type="button" class="btn btn-danger">Ambil Paket</button>
                    </div>
                </div>
                <div class="card border-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center">Menu 2</div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">Primary card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the
                            card's content.</p>
                    </div>
                    <div class="text-center mb-3"><button type="button" class="btn btn-danger">Ambil Paket</button>
                    </div>
                </div>
                <div class="card border-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header text-center">Menu 3</div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">Primary card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the
                            card's content.</p>
                    </div>
                    <div class="text-center mb-3"><button type="button" class="btn btn-danger">Ambil Paket</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
body {
    background-color: #eeeeee;
}

.container {
    background-image: url(../../../assets/img/landing-page/4386.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    border-radius: 30px;
    margin-top: 0px;
    overflow: hidden;
}

.container .stiky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}

.container h1 {
    font-size: 3rem;
}

.container .overlay {
    background-color: rgba(0, 0, 0, .5);
    color: #ffffff;
    width: 62%;
}

.container .mt-150 {
    margin-top: 150px;
}

.container .bg {
    background-color: rgba(0, 123, 255, .9);
    border-top-left-radius: 95px;
    padding: 20px;
    width: 70%;
    margin-left: 32%;
}

.bg .inline-block {
    display: inline-block;
}

.bg .inline-block span {
    font-size: 50px;
    font-weight: 600;
}

.bg .get-cupoun {
    padding: 10px 25px;
    border: none;
}

.overlay-white {
    background-color: rgba(255, 255, 255, .6);
    padding: 10px 0;
}

.mt-5 .jc-evenly {
    justify-content: space-evenly;
}

.mb-3 .btn-danger {
    background-color: #f68c98;
    border-color: #f68c98;
}
</style>
