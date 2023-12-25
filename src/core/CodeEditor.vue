<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = useEditor({
  content: "aba",
  extensions: [
    StarterKit,
  ],
})
</script>

<template>
  <editor-content :editor="editor" />
</template>

