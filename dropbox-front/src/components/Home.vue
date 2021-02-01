<template>
  <div id="Home">
    <v-container>
      <v-card>
        <v-card-title class="pa-5">
          <v-row>
            <v-col cols="auto"><h3>Directory Content</h3></v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" class="d-flex justify-center">
              <v-text-field label="Content Name" v-model="contentName" outlined dense></v-text-field>
              <v-btn class="ml-2 secondary" depressed @click="createContent(1)">CREATE FILE</v-btn>
              <v-btn class="ml-1 secondary" depressed @click="createContent(2)">CREATE DIRECTORY</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row v-for="(content,index) in contents" :key="index">
            <v-col cols="9">
              {{ content }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-btn @click="editFile(content)" class="blue--text" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="removeFile(content)" class="red--text" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Rename Content</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                Current Name {{ contentName }}
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newName" label="New Content Name" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            CLOSE
          </v-btn>
          <v-btn @click="updateFile" color="blue darken-1" text>
            UPDATE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      contents: [], contentName: '', newName: '', dialog: false
    }
  },
  mounted() {
    setInterval(() => {
      this.getContents()
    }, 2000)
  },
  methods: {
    getContents() {
      axios.get('http://localhost:8000/getContents').then(res => {
        this.contents = res.data
      })
    },
    createContent(contentType) {
      axios.get(`http://localhost:8000/createContent/${contentType}/${this.contentName}`)
      this.newName = ''
      this.contentName = ''
    },
    editFile(contentName) {
      this.contentName = contentName
      this.contentName = contentName
      this.dialog = true
    },
    updateFile() {
      axios.get(`http://localhost:8000/updateContent/${this.contentName}/${this.newName}`)
      this.dialog = false
      this.newName = ''
      this.contentName = ''
    },
    removeFile(contentName) {
      axios.get(`http://localhost:8000/removeContent/${contentName}`)
    },
  }
}
</script>

<style>
</style>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>