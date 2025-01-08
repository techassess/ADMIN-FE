<template>
    <a href="#" class="my-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" :title="description">
        <img src="../../assets/question.png" alt="" height="16px" width="16px">
    </a>
</template>

<script>
export default {
    name: 'MyTooltips',
    props: ['description'],
    setup(props) {
        console.log(props.description);
    }
}
</script>
