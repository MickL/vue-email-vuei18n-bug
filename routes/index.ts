import MailComponent from '~/components/mail.vue';

export default eventHandler((event) => {
  return useRenderEmail(MailComponent);
});
