<template>
  <v-container class="text-center">
    <v-row :align="'center'" :justify="'center'" class="mt-12">
      <v-col cols="12" md="6" lg="3">
        <authentication-form></authentication-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationForm from '@/components/forms/authenticationForm'

export default {
  components: { AuthenticationForm },
}
</script>