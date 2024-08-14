# Middleware

<script setup>
const sliders = [
  {
    metadata: {
      title: 'Api Preview',
      description: 'A globally registered component'
    },
    slides: [
      {
        tab: 'Tab 1'
      },
      {
        tab: 'Tab 2'
      }
    ]
  }
]
</script>

<ApiPreview :sliders="sliders" />
