<template>
    <div>
        <Navbar/>
        <SideBar/>
        <!-- <Mainmenu/> -->
        <!-- <div>
            <router-view/>
        </div> -->
    </div>
</template>

<script>
import Navbar from '../../components/_base/navbar'
import SideBar from '../../components/_base/leftbar'
// import Mainmenu from '../../components/_base/main'

export default {
  name: 'Main',
  components: {
    Navbar,
    SideBar
    // Mainmenu
  }
}
</script>

<style scoped>
/* * {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}
.container {
    display: grid;
    grid-template-areas:
        "header header cart"
        "left-bar main your-cart";
    grid-template-columns: 0.13fr 2fr 1.5fr;
    font-size: 15px;
}

.container img {
    width: 25px;
    height: 25px;
}

header {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    padding: 20px;
    grid-area: header;
    display: flex;
}

header h1 {
    font-size: 1.5em;
    font-weight: 200;
    flex: 5;
    display: flex;
    justify-content: center;

}

.cart {
    grid-area: cart;
    padding-top: 20px;
    text-align: center;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
}

.cart span {
    font-size: 20px;
    font-weight: 200;
}

.cart .badge {
    font-size: 15px;
    background-color: #57CAD5;
    color: #ffffff;
    border-radius: 50%;
}

.left-bar {
    grid-area: left-bar;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.left-bar img {
    display: block;
    margin-top: 25px;
}

main {
    grid-area: main;
    background: rgba(190, 195, 202, 0.3);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

main .card-main {
    display: inline-block;
    width: 30% !important;
    margin-bottom: 10px;
}

.card-main p:nth-child(3) {
    font-weight: 600;
}

.container main img {
    width: 100%;
    height: 160px;
    max-height: 160px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.your-cart {
    grid-area: your-cart;
    margin-top: 55px;
}

.container-your-cart {
    width: 50%;
    margin: auto;
    text-align: center;
}

.your-cart img {
    width: 50%;
    min-width: 118px;
    height: 125px;
    max-height: 125px;
    margin: 0 auto;
}

.your-cart span {
    display: block;
    font-size: 20px;
}

.your-cart span:nth-child(3) {
    font-size: 12px;
    color: #CECECE;
} */

/* responsive  */

/* @media (max-width : 768px) {
    .container {
        display: grid;
        grid-template-areas:
            "header header header"
            "left-bar main main";
        grid-template-columns: 0.13fr 2fr 1.5fr;
        font-size: 15px;
    }

    .cart {
        display: none;
    }

    .your-cart {
        display: none;
    }
}

@media (max-width : 576px) {
    .container {
        display: grid;
        grid-template-areas:
            "header header"
            "main main";
        grid-template-columns: 0.13fr 2fr;
    }

    .cart {
        display: none;
    }

    .left-bar {
        display: none;
    }

    .your-cart {
        display: none;
    }

    main .card-main {
        display: inline-block;
        width: 50% !important;
        margin-bottom: 10px;
    }

    .container main img {
        width: 95%;
        height: 160px;
        max-height: 160px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

} */
</style>
