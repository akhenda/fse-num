import { createConsola } from 'consola';
import { toast } from 'sonner';

export const logger = createConsola({
  formatOptions: { date: true, columns: 20 },
  reporters: [
    {
      log: (log) => {
        const text = (log.message ?? '') + log.args.join(' ');

        if (log.type === 'success') toast.success(text);
        if (['error', 'fail', 'fatal'].includes(log.type)) toast.error(text);
      },
    },
    {
      log: (log) => {
        createConsola({ formatOptions: { date: false } }).log(log);
      },
    },
  ],
});
