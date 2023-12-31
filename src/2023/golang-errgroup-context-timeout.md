{ "header": {"name": "Go", "order": 6},  "order": 5, "date": "2023-12-31 20:45" }
---
# errgroup.withContext()を使ってTimeoutでgoroutineを終了する

下記のコードではGoの[errgroup.withContext()](https://pkg.go.dev/golang.org/x/sync/errgroup#WithContext)を使って、
goroutine内でerrorが発生した場合やTimeoutが発生した場合にgoroutineを終了するようにしています。

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

func timeout(cancel context.CancelFunc, eg *errgroup.Group, ms time.Duration) error {
	c := make(chan error)
	go func() {
		defer close(c)
		c <- eg.Wait()
	}()
	select {
	case err := <-c:
		return err
	case <-time.After(ms):
		cancel()
		return errors.New("timeout")
	}
}

func createWorker(ctx context.Context, i int) func() error {
	worker := func() error {
		fmt.Printf("before: i = %d\n", i)
		if i == 3 {
			// goroutine内でerrorにするには以下のコードのコメントをはずします。
			// return fmt.Errorf("i is %d", i)
			return nil
		}
		time.Sleep(time.Duration(i*100) * time.Millisecond)
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			fmt.Printf("after: i = %d\n", i)
		}
		return nil
	}
	return worker
}

func main() {
	_ctx, cancel := context.WithCancel(context.Background())
	eg, ctx := errgroup.WithContext(_ctx)
	for i := 0; i < 5; i++ {
		eg.Go(createWorker(ctx, i))
	}
	// Timeoutにするには以下のコードのコメントをはずします。
	// ms := 200 * time.Millisecond
	ms := 2000 * time.Millisecond
	if err := timeout(cancel, eg, ms); err != nil {
		log.Fatal(err)
	}
	fmt.Println("end")
}
```