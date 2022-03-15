# Guide for scripting docs

## What is needed

Creating a component DOC takes three steps: 

- Create a description for the component
- Comment the props, slots and events, if needed. 
- In 'examples-docs' directory located in src, create an example file for the component (recommended).

## Components

### Component Description

The comment must be explicitly before the `export default` line, and between /** */ syntax. For multiple lines add another * in the next line.

| Example

``` vue
<script>
    // ...

    /**
    * Component description
    * More content
    */
    export default {
        // ...
    }

    // ...
</script>
```

### Properties

The comment must be explicitly before the `prop-name` line, and between /** */ syntax. For multiple lines add another * in the next line.

| Example

``` vue
<script>
    // ...

    props: {
        /**
        * First prop description
        */
        firstProp: String
    }

    // ...
</script>
```

### Slots

Slots comments are written in HTML comment syntax. In the following examples is shown how to write single/multiple lines for the component slot/s doc.
<br>Be sure to have just <b>ONE</b> slot without `name` tag, because the doc generator will only take one default slot. 

| Single line

``` vue
<template>
    // ...

    <!-- @slot Header multiple slot description -->
    <slot name="header">Title</slot>

    // ...
</template>
```

| Multiple lines 

``` vue
<template>
    // ...

    <!-- @slot Header slot description
    More description 
                
    Description
    -->
    <slot name="header">Title</slot>

    // ...
</template>
```

### Events

Comment strictly above the event.

``` vue
<script>
    // ...

    /**
    * Description of the event: Event completed with success.
    */
    this.$emit('success', this.booleano, {
        demo: 'example'
    })

    // ...
</script>
```

## Views

### View Description

The comment must be explicitly before the `export default` line, and between /** */ syntax. For multiple lines add another * in the next line.

| Example

``` vue
<script>
    // ...

    /**
    * Component description
    * More content
    */
    export default {
        // ...
    }

    // ...
</script>
```

## Creating an Example File

A folder called <i>examples-docs</i> in /src is needed. <br>
To create the example of a component, you have to create a file with the name of the component in kebab-case following .md extension <br>
Inside that file, add a `div` tag and inside add your example or examples like you would call it in a Vue template, with its props if needed.<br><br>
| Example <br><br> 
You have a component called `TestOne.vue` with `test_name` as a prop, and its name in kebab-case is `test-one`. Inside src/examples-docs, you create a file called `test-one.md`. And inside, a div and in that div the examples or examples. The result would be:<br><br>

``` vue
<div>
    <test-one 
        test_name="The name of the test" 
    />
</div>
```