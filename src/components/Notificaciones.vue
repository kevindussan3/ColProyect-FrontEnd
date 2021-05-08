<template>
    <div id="notifications">
        <div v-for="(notification, index) in notifications" :class="getNotificationClass(notification)" role="alert" :key="index">
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },

        methods: {
            getNotificationClass: function(notification)
            {
                return 'alert alert-' + notification.type + ' alert-dismissible fade show' ;
            }
        },

        props: ['notifications']
    }
</script>
