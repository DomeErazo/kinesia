<template>
  <v-card>
    <v-responsive :aspect-ratio="16 /9">
      <h1
        style="text-align: center; margin-bottom: 10px"
      >Bienvenido a Kinterview</h1>
      <img class="imagen" src="/IngresoAdmin.svg" style="width:350px"/>
       <br/>
        <br/>
      <v-card-text>
        <div class="card">
          <div class="container" id="tamaño">
                <v-card-text class="texto">
           Kinterview es una herramienta de apoyo para el proceso de contratación de nuevos trabajadores en las distintas organizaciones, su principal objetivo es brindar soporte en el proceso 
           de análisis del perfil psicológico del postulante a través del análisis del lenguaje facial, para de esta manera resaltar diversos aspectos que pueden ser de alto interés al 
           momento de la selección final.  </v-card-text>
              <v-card-text>Entre las observaciones que el sistema tomará en cuenta tenemos: confianza, inseguridad, confusión, aceptación, nervios y finalmente si dice la verdad o miente 
                en sus respuestas. Estos son factores importantes que generalmente se toma en cuenta en este tipo de procesos para que la empresa pueda decidir si es conveniente o no la 
                persona a la que están considerando contratar según sus intereses. </v-card-text>
                <v-card-text>Se le recuerda que los resultados obtenidos a través de esta herramienta son solo un apoyo a la decisión final y además estos datos son de uso exclusivo de la organización</v-card-text>

          </div>
        </div>
        <br />
         <br />
        <br />
          <br />
        <br />
        

        <h3 style="text-align: center; margin-bottom: 10px">Gracias por formar parte de nuestro equipo</h3>
      

        <br />

        
      </v-card-text>
    </v-responsive>
  </v-card>
</template>
<script>
export default {
  layout: "adminEmpr",
};
</script>
<style >
.imagen {
  margin-left: 40%;
  width: 60%;
}

.texto {
  text-align: justify;
  align-content: "center";
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
   margin-left: 15%;
  width: 70%;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
  
}
</style>