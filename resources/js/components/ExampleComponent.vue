<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>

                    <p>
                        <button @click="onClick">Click me to trigger an error.</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },

        methods: {
            onClick() {
                someUndefinedFunction();

                throw new Error('Such is life.');
            }
        }
    }
</script>
