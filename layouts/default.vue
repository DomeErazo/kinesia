<template>
  <v-app dark>
   
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    HOLA
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        
      </v-btn>
      
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
       
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- <Nuxt /> -->
      </v-container>
    </v-main>
 
    <v-footer
      :absolute="!fixed"
      app
    >
     
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
   
      miniVariant: false,
      right: true,
      rightDrawer: false,
      
    }
  }
}
</script>
